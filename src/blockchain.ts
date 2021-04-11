import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: string;

    constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

const calculateHashForBlock = (block: Block): string =>
    calculateHash(block.index, block.previousHash, block.timestamp, block.data);

const genesisBlock: Block = new Block(
    0, 'e3bd72d0d6284041f573afaea0b5dc25158d04426304eabdcd7d45080555a874', null, 1617541936, 'Genesis block'
);

const genesisBlockString: string = JSON.stringify(genesisBlock);

const blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const generateNextBlock = (blockData: string) => {
    const previousBlock: Block = getLatestBlock();
    const nextIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = Date.now() / 1000 | 0;
    const nextHash: string = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock: Block = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
    return newBlock;
};

const printNewGenesisBlockInfo = () => {
    const index = 0;
    console.log("Index: " + index);
    const timestamp: number = Date.now() / 1000 | 0;
    console.log("Timestamp: " + timestamp);
    const previousHash = null;
    console.log("Previous hash: " + previousHash);
    const data = "Genesis block";
    console.log("Data: " + data);
    const hash = calculateHash(index, previousHash, timestamp, data);
    console.log("Hash: " + hash);
};

const isValidBlockStructure = (block: Block): boolean => {
    return typeof block.index === 'number'
        && typeof block.previousHash === 'string'
        && typeof block.hash === 'string'
        && typeof block.data === 'string'
        && typeof block.timestamp === 'number'
}

const isValidNewBlock = (newBlock: Block, previousBlock: Block): boolean => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log("Invalid index: " + newBlock.index)
        return false;
    }
    if (previousBlock.hash !== newBlock.previousHash) {
        console.log("Invalid previous hash: " + newBlock.previousHash)
        return false;
    }
    if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log("Invalid hash: " + newBlock.hash)
        return false;
    }
    return true;
}

const isValidChain = (blockchainToValidate: Block[]): boolean => {

    const isValidGenesisBlock = (): boolean => {
        return genesisBlockString === JSON.stringify(blockchainToValidate[0]);
    }

    if (!isValidGenesisBlock()) {
        return false;
    }

    for (let i = 1; i < blockchainToValidate.length; i++) {
        if (!isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
            return false;
        }
    }
    return true;
}

export {Block, getBlockchain, getLatestBlock, generateNextBlock, printNewGenesisBlockInfo};