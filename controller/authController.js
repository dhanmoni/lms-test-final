const {ethers} =  require('ethers')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

exports.userAuth = async (req, res) => {
    console.log('In user auth backend')
    const { signature, publicKey } = req.body;
    if (!signature || !publicKey){
        return res.status(400).json({ error: 'Request should have signature and publicKey' });
    }
    console.log({signature, publicKey});

    return (
        User.findOne({ publicKey })
        .then((user) => {
            if (!user) {
                throw new Error('404');            
            }
            return user;
        })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((user) => {
            console.log("2nd then=> ",user)
            if (!user) {
                throw new Error('404');   
            }

            const msg = `I am signing my one-time nonce: ${user.nonce}`;

            const address = ethers.utils.verifyMessage(msg, signature)
           
            // The signature verification is successful if the address found with
            // ethers.utils.verifyMessage matches the initial publicKey
            if (address.toLowerCase() == publicKey) {
                return user;
            } else {
                return null;
            }
        })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then((user) => {
            console.log("3rd then=> ",user)

            if (!user) {
                throw new Error('401');   
            }
            console.log('hello')
            user.nonce = Math.floor(Math.random() * 10000);
            return user.save();
        })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then((user) => {
            const payload = {
                user: {
                    publicKey,
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                process.env.JWT_TOKEN,
                { expiresIn: '24h' },
                (err, token) => {
                if (err) throw err;
                return res.json({ token });
                }
            );
        })
        .catch( (err) => {
            if (err.message === '404') {
                res.status(404).json({
                    message: `user with publicKey ${publicKey} doesnot exists`
                })
            } 
            else if (err.message === '401') {
                res.status(404).json({
                    message: `user verification failed`
                })
            } else {
                res.status(500).json({
                    error: err
                })
            }
        })
    )
};


exports.createUser = async (req,res)=> {
    console.log('registering...', req.body.publicKey)
    const { publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    return (
        User.findOne({publicKey})
        .then(async user=> {
            if(user) {
                return res.status(400).json({ error:  'user already exists' });
            }
            console.log('creating...')
            const newUser = await User.create({publicKey});
            return res.status(200).json(newUser);
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}

exports.getUserByPublicKey = async (req, res)=> {
    console.log('public key param:', req.params)
    const { publicKey } = req.params;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }

    return (
        User.findOne({publicKey})
        .then(async user=> {
            
            if(user) {
                return res.json(user);
            } else {
                return res.json(null);
            }
            
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}


