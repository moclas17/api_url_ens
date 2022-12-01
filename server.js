const { query } = require('express');
const express = require('express');
const app = express();

var ethers = require('ethers');
var url = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
var provider = new ethers.providers.JsonRpcProvider(url);

async function getlink(ens) {
    const resolver = await provider.getResolver(ens);
    const linkmetadata = await resolver.getText("url");
    console.log(linkmetadata); // pero en la consola si se muestra lo que quiero :D 
    return linkmetadata;
}

app.get('/', async (req, res) => {
    console.log(req.query.data);
    let domain=req.query.data;
    let miurl = await getlink(domain+".eth");
    res.send(miurl); //sabes por que miurl regresa [object Promise] en el navegador
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});




