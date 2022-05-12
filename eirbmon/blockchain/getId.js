const fs = require('fs');

const API_URL = ""
const mintcontract = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./build/contracts/mintNft.json")

const nftContract = new web3.eth.Contract(contract.abi, mintcontract)

async function getUriId(tokenId) {
    const uri = await nftContract.methods.tokenURI(tokenId).call({from: "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB"})
    const first = uri.split("/")
    const second = first[5].split(".")
    const id = second[0]
    return id
}

// getUriId(2008).then(console.log)


createJson = async () => {
    let all = []
    let tab = {
        nft_id: 0,
        nft_img: 0
    };
    for(let i = 2; i<=3314; i++){
        // tab.nft_id = i;
        // tab.nft_img = await getUriId(i)
        // console.log(tab)
        const nft_img =  await getUriId(i)
        const link = `https://masteronepiece.com/wp-content/uploads/eirbmon/${nft_img}.svg`
        all.push({ nft_id: i,
            nft_img: link})
        // console.log(all)
    }
    let data = JSON.stringify(all,null,2);
    JSON.parse(data)
    fs.writeFileSync("./comparaison.json", data);


}
createJson()
