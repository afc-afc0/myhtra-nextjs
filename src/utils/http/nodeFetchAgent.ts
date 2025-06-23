import * as https from 'https'

export const agent = process.env.NODE_ENV === 'development' ? new https.Agent({ rejectUnauthorized: false }) : https.globalAgent
