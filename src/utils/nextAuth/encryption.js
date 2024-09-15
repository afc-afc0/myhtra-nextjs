import crypto from 'crypto'

const secretKey = process.env.NEXTAUTH_SECRET
const key = crypto.scryptSync(secretKey, 'salt', 32)
const algorithm = 'aes-256-cbc'

export const encrypt = (text) => {
    const iv = crypto.randomBytes(16)
    const sipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = sipher.update(text, 'utf8', 'hex')
    encrypted += sipher.final('hex')
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    }
} 

export const decrypt = (encryptedData) => {
    let iv = Buffer.from(encryptedData.iv, 'hex')
    let encryptedText = Buffer.from(encryptedData.encryptedData, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

