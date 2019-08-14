pragma solidity 0.5.1;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721Full.sol";



contract DeedContract is ERC721Full{
    
    constructor(string memory _name, string memory _symbol) public ERC721Full(_name, _symbol){}
    
        function registerDeed(uint256 _tokenId, string memory _uri) public {

        _mint(msg.sender, _tokenId);

        addDeedMetadata(_tokenId, _uri);

        emit DeedRegistered(msg.sender, _tokenId);

    }

    function addDeedMetadata(uint256 _tokenId, string memory _uri) public returns(bool){

        _setTokenURI(_tokenId, _uri);

        return true;
    }

    event DeedRegistered(address _by, uint256 _tokenId);
    
}