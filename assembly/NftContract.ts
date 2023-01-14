import { context, storage, NearBindings } from "near-sdk-as";

// NFT Structure
class NFT {
    id: string;
    owner: string;

    constructor(id: string, owner: string) {
        this.id = id;
        this.owner = owner;
    }
}

// NFT Array
const nftArray = new NearBindings.Map<string, NFT>("n:");

// Create NFT function
export function createNFT(id: string): void {
    // Check if the NFT already exists
    if (nftArray.getSome(id)) {
        context.revert("NFT already exists");
    }
    // Create new NFT
    let nft = new NFT(id, context.sender);
    nftArray.set(id, nft);
}

// Transfer NFT function
export function transferNFT(id: string, newOwner: string): void {
    // Check if the NFT exists
    let nft = nftArray.getSome(id);
    if (!nft) {
        context.revert("NFT does not exist");
    }
    // Check if the caller is the owner of the NFT
    if (nft.owner != context.sender) {
        context.revert("You are not the owner of the NFT");
    }
    // Transfer ownership
    nft.owner = newOwner;
    nftArray.set(id, nft);
}

// Get NFT function
export function getNFT(id: string): NFT | null {
    let nft = nftArray.getSome(id);
    return nft ? nft : null;
}
