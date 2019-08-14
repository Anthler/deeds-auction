pragma solidity 0.5.1;

import "./NewDeedRepo.sol";
contract AuctionContract{
    
    address deedRepositoryAddress;
    Auction[] public auctions;
    mapping(uint => Bid[]) auctionBids;
    mapping(address => uint[]) auctionOwner;
    
    
    struct Auction{
        string name;
        uint blockDeadline;
        string metadata;
        uint deedId;
        uint256 startPrice;
        address payable owner;
        bool active;
        bool finalized;
        
    }
    
    struct Bid{
        address from;
        uint amount;
    }
    
        modifier isOwner(uint _auctionId) {

        require(auctions[_auctionId].owner == msg.sender);
        _;
    }

    modifier contractIsDeedOwner( uint256 _deedId) {

        address deedOwner = DeedContract(deedRepositoryAddress).ownerOf(_deedId);
        require(deedOwner == msg.sender);
        _;
    }
    
    constructor(address _deedRepositoryAddress)public{
        deedRepositoryAddress =address( _deedRepositoryAddress);
    }
    
    function getAuctionCount() public view returns(uint){return auctions.length;}
    
    function getBidsCount(uint auctionId) public view returns(uint){return auctionBids[auctionId].length;}
    
    function getAuctionsOf(address _owner) public view returns(uint[] memory){
        uint[] storage auctionsOwned = auctionOwner[_owner]; 
        return auctionsOwned;
    }
    
    function getCurrentBid(uint _auctionId) public view returns(uint, address){
        uint bidsLength = auctionBids[_auctionId].length;
        if(bidsLength > 0 ){
            Bid memory lastBid = auctionBids[_auctionId][bidsLength-1];
            return (lastBid.amount, lastBid.from);
        }
        
        return(0,address(0));
    }
    
    function getAcutionsCountOfOwner(address _owner) public view returns(uint){
        return auctionOwner[_owner].length;
    }
    
    function getAuctionById(uint _auctionId) public view returns(
        
        string memory name,
        uint256 blockDeadline,
        uint256 startPrice,
        string memory metadata,
        uint256 deedId,
        //address deedRepositoryAddress,
        address owner,
        bool active,
        bool finalized
        ){
        
        Auction storage auc = auctions[_auctionId];
                return (

            auc.name, 
            auc.blockDeadline, 
            auc.startPrice, 
            auc.metadata, 
            auc.deedId, 
            //auc.deedRepositoryAddress, 
            auc.owner, 
            auc.active, 
            auc.finalized
            );
        
    }
    
        function createAuction( uint256 _deedId, string memory _auctionTitle, string memory _metadata, uint256 _startPrice, uint _blockDeadline) public contractIsDeedOwner(_deedId) returns(bool) {

        uint auctionId = auctions.length;
        Auction memory newAuction;
        newAuction.name = _auctionTitle;
        newAuction.blockDeadline = _blockDeadline;
        newAuction.startPrice = _startPrice;
        newAuction.metadata = _metadata;
        newAuction.deedId = _deedId;
        newAuction.owner = msg.sender;
        newAuction.active = true;
        newAuction.finalized = false;
        auctions.push(newAuction);        
        auctionOwner[msg.sender].push(auctionId);
        
        emit AuctionCreated(msg.sender, auctionId);
        return true;
    }
    
    function approveAndTransfer(address _from, address _to,  uint256 _deedId) public returns(bool) {
        
        DeedContract remoteContract = DeedContract(deedRepositoryAddress);
        remoteContract.approve(_to, _deedId);
        remoteContract.transferFrom(_from, _to, _deedId);
        return true;
    }
    
    
    function cancelAuction(uint _auctionId) public isOwner(_auctionId) {
        Auction memory auction = auctions[_auctionId];
        uint  bidsLength = auctionBids[_auctionId].length;
        
        if(bidsLength > 0 ){
            Bid memory lastBid = auctionBids[_auctionId][bidsLength-1];
            uint160 tempAddr = uint160(lastBid.from);
            address payable lastBidder = address(tempAddr);
            if(!lastBidder.send(lastBid.amount)) {

                revert();
            }
        }
        
        if(approveAndTransfer(address(this), auction.owner, auction.deedId)){

            auctions[_auctionId].active = false;
            emit AuctionCanceled(msg.sender, _auctionId);
        }
    }
    
    function finalizeAuction(uint _auctionId) public{
        
        Auction memory auction = auctions[_auctionId];
        uint bidsLength = auctionBids[_auctionId].length;
        
        if(now < auction.blockDeadline){revert();}
        if(bidsLength == 0){ 
            cancelAuction(_auctionId);
            
        }else{
            Bid memory lastBid = auctionBids[_auctionId][bidsLength-1];
            if(!auction.owner.send(lastBid.amount)){
                revert();
            }
            
            if(approveAndTransfer(address(this), lastBid.from, auction.deedId)){

                auctions[_auctionId].active = false;
                auctions[_auctionId].finalized = true;
                emit AuctionFinalized(msg.sender, _auctionId);
            }
        }
        
    }
    
    function bidOnAuction(uint _auctionId) public payable{
        Auction storage auction = auctions[_auctionId];
        uint amountSent = msg.value;
        
        if(msg.sender == auction.owner){ revert();}
        if(now > auction.blockDeadline){ revert();}
        
        uint bidsLength = auctionBids[_auctionId].length;
        uint tempAmount = auction.startPrice;
        Bid memory  lastBid;
        
        if( bidsLength > 0 ) {

             lastBid = auctionBids[_auctionId][bidsLength - 1];
            tempAmount = lastBid.amount;
        }
        if(amountSent < tempAmount) revert();
        if(bidsLength > 0){
            uint160 tempAddr = uint160(lastBid.from);
            address payable lastBidder = address(tempAddr);
            if(!lastBidder.send(lastBid.amount)) revert();
        }
        
        Bid memory newBid;
        newBid.from = msg.sender;
        newBid.amount = amountSent;
        auctionBids[_auctionId].push(newBid);
        emit BidSuccess(msg.sender, _auctionId);
        
        
    }
    
    
    event BidSuccess(address _from, uint _auctionId);
    event AuctionCreated(address _owner, uint _auctionId);
    event AuctionCanceled(address _owner, uint _auctionId);
    event AuctionFinalized(address _owner, uint _auctionId);
}