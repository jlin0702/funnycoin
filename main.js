const sha256 = require('crypto-js/sha256') 
const ecLib = require('elliptic').ec
const ec = new ecLib('secp256k1')

class Transaction   //money move
{
    constructor(from,to,amount)
    {
        this.from = from    //who send the money
        this.to = to    //who get the money
        this.amount = amount    //how much was send
    }
    computeHash()   //cumpute transation hash
    {
        return sha256(this.from+this.to+this.amount).toString()     //use sha256
    }
}

class Data  //what people say
{
    constructor(language)
    {
        this.data = language
    }
    computeHash()   //comput data hash
    {
        return sha256(this.language).toString()
    }
}

class Block     //a block
{
    constructor(transactions,previousHash,datas)    
    {
        this.previousHash = previousHash    //previous block hash
        this.datas = datas      //language
        this.transactions = transactions    //money move
        this.Merklehash = this.Merklehashs()    //for virify 
        this.nonce = 1  //initial nouce
        this.hash = this.computeHash()      //this hash, actualy is head hash
    }

    Merklehashs()   //hash final two hash togethor and hash again
    {
        return sha256(sha256(this.MerkleTreeHash(this.datas)+this.MerkleTreeHash(this.transactions)).toString()).toString()
    }

    getAnswer(difficulty)   //use to control mine speed
    {
        let answer = ''     //ininal anwser
        for(let i = 0; i < difficulty;i++)      
        {
            answer += '0'       //we use 0 at front, also we can set a target and small than it.
        }
        return answer
    }

    mine(difficulty)
    {
        while(true)     //always true loop
        {
            this.hash = this.computeHash()  
            if(this.hash.substring(0,difficulty) != this.getAnswer(difficulty))     //continue situation
            {
                this.nonce++    //change nonce
                this.hash = this.computeHash()      //compute hash
            }
            else
            {
                break   //succeed and out
            }
        }
    }

    MerkleTreeHash(datatrans)   //count for merkle Tree Hash
    {
        let halfMerkle1 = [JSON.stringify(datatrans)]       //put input to halfMerkle1
        let halfMerkle2 = []        //set a null
        if(halfMerkle1.length == 1)
        {
            halfMerkle2[0] = sha256(halfMerkle1[0]).toString()      //if only one, just hash
        }
        while(halfMerkle2.length != 1 )     //loop until one
        {
            halfMerkle1 = halfMerkle2       
            halfMerkle2 = []
            if(halfMerkle1.length%2 == 0)   //even
            {
                for(let i=0; i<halfMerkle1.length-1; i=i+2)     
                {//hash left and right and add together
                    halfMerkle2[i/2] = sha256(sha256(halfMerkle1[i]).toString()+sha256(halfMerkle1[i+1]).toString()).toString()
                }
            }
            else    //odd
            {
                for(let i=0; i<halfMerkle1,length-1;i=i+2)
                {//hash left and right and add together
                    halfMerkle2[i/2] = sha256(halfMerkle1[i]+halfMerkle1[i+1]).toString()
                }//make the rest one the new hash
                halfMerkle2[halfMerkle2.length] = sha256(halfMerkle1[halfMerkle1.length-1]).toString()
            }
        }
        return sha256(halfMerkle2[0]).toString()
    }

    computeHash()
    {//for head
        return sha256(this.previousHash+this.nonce+JSON.stringify(this.datas)).toString()
    }
}

class Chain
{
    constructor()
    {
        this.chain = [this.Genesis()]
        this.transactionPool = []       //waiting transation
        this.DataPool = []      //use for waiting data
        this.mineReward = 100       //mine when block on
        this.difficulty = 2     
    }

    addTransaction(transaction)     //make trade
    {
        if(legalTransaction)
        {
            this.transactionPool.push(transaction)      //push 
        }
        else
        {
            throw error('no enough money');     //legal
        }
    }

    addDatas(data)
    {
        this.DataPool.push(data)        //make language
    }

    minePool(addr)
    {
        const prize = new Transaction('none',addr,this.mineReward)       //when block connect
        this.transactionPool.push(prize)        //put thin wait
        const newBlock = new Block(this.transactionPool, this.getLastBlock().hash,this.DataPool)    
        newBlock.mine(this.difficulty)      //mine
        this.chain.push(newBlock)       
        this.transactionPool = []       // reset
        this.DataPool = []      //reset
    }

    Genesis()
    {       //first block
        const genesisBlock = new Block([new Transaction('A','B',10),],'',[new Data('Welcome!')])    
        return genesisBlock
    }
    
    getLastBlock()
    {//get the final block
        return this.chain[this.chain.length-1]
    }
}

class UTXO      // unspend money
{
    constructor()
    {
        this.money = 0
        this.trade = []
        this.goal = []
    }
    collect(addr,chain)
    {
        for(let i=0;i<chain.length;i++)
        {
            this.trade.push(chain[i].transactions)
        }
        for(let i=0;i<this.trade.length;i++)
        {
            for(let j=0;j<this.trade[i].length;j++)
            {
               if(this.trade[i][j].to == addr) 
               {
                this.money = this.money + this.trade[i][j].amount
               }
               else if(this.trade[i][j].from == addr)
               {
                this.money = this.money - this.trade[i][j].amount
               }
            }
        }
        console.log(this.money)
    }
}

class Member
{
    constructor()
    {
        this.keyPair = ec.genKeyPair();
        this.privateKey = keyPair.getPrivate('hex')
        this.publicKey = keyPair.getPublic('hex')
        
    }

}

class Verify
{
    constructor()
    {
        this.moneycheck = new UTXO
    }
    legalTransaction(add,chain)
    {
        if(moneycheck.collect(add,chain)>0)
        {
            return true
        }
        else
        {
            return false
        } 
    }
}


const funnyCoins = new Chain()
const t1 = new Transaction('A','B',10)
const d1 = new Data('为了联盟')
funnyCoins.addTransaction(t1)
funnyCoins.addDatas(d1)
funnyCoins.minePool('A')
console.log(funnyCoins.chain)
const moneycheck = new UTXO
moneycheck.collect('A',funnyCoins.chain)

