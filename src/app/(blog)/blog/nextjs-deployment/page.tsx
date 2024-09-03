import React from "react"

import styles from './page.module.css'
import { FlexContainer } from "@components/ui/Layout/FlexContainer/FlexContainer"
import { Text, TextType } from "@components/ui/Text/Text"
import Link from "next/link"

export const metadata = {
  title: 'Myhtra',
  description: 'Myhtra Studios Blog'
}

export default function Home() {
  return (
    <Post />
  )
}

// const Post = () => {
//   return (
//     <FlexContainer width='100%' height="100%" alignItems='center' paddingSize='xl'>
//       <PostContainer>
//         <FlexContainer width='inherit' height='auto' flexDirection='column' paddingSize='m' borderRadius='s' borderWidth='s' gapSize='s'>
//           <Text text="Deploying Next.js on Azure Kubernetes Services with Custom DNS" fontSize='l' fontWeight='bold' />
//           <Text 
//             text='Deploying a Next.js application on Kubernetes Cluster with a custom domain name on Azure'
//             fontSize='s'
//             fontWeight='light'
//           />
//           <FlexContainer flexDirection='column'>
//             <Text 
//               text='Prerequisites'
//               fontSize='l' 
//               fontWeight='medium' 
//             />
//             <div>
//               <Text 
//                 text='&#x2022; Azure Kubernetes Services (AKS) cluster deployed otherwise follow this '
//                 fontSize='s' 
//                 fontWeight='light' 
//                 display='inline'
//               />
//               <Link target='_blank' href='https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli'>
//                 <Text 
//                   type={TextType.LINK} 
//                   fontSize='s'
//                   text='guide' 
//                   fontWeight='medium' 
//                   display='inline' 
//                 />
//               </Link>
//             </div>
//             <div>
//               <Text 
//                 text='&#x2022; You have a Next.js application ready, I will use Next.js 14 for this tutorial. If not for creating Next.js application follow this '
//                 fontSize='s' 
//                 fontWeight='light' 
//                 display='inline'
//               />
//               <Link target='_blank' href='https://nextjs.org/docs/getting-started/installation'>
//                 <Text 
//                   type={TextType.LINK} 
//                   fontSize='s'
//                   text='guide' 
//                   fontWeight='medium' 
//                   display='inline' 
//                 />
//               </Link>
//             </div>
//             <div>
//               <Text 
//                 text='&#x2022; Custom domain name, I will use myhtra.co for this tutorial'
//                 fontSize='s' 
//                 fontWeight='light' 
//                 display='inline'
//               />
//             </div>
//           </FlexContainer>
//           <FlexContainer flexDirection='column'>
//             <Text
//               text='Steps'
//               fontSize='l'
//               fontWeight='medium'
//             />
//             <div>
//               <Text
//                 text='1. Creating Dockerfile and pushing the image to Docker Hub'
//                 fontSize='s'
//                 fontWeight='light'
//               />
//               <Text
//                 text='2. Configuring Helm chart for Next.js application and installing the chart on the cluster'
//                 fontSize='s'
//                 fontWeight='light'
//               />
//             </div>
//           </FlexContainer>
//           <Text
//             text='1. Creating Dockerfile and pushing the image to Docker Hub'
//             fontSize='m'
//             fontWeight='medium'
//           />
//           <FlexContainer flexDirection='column'>
//             <Text
//               text='Create a Dockerfile in the root of your Next.js application'
//               fontSize='s'
//               fontWeight='light'  
//             />
//             <Text
//               text='
//                 FROM node:18-alpine AS base /n

//                 # Install dependencies only when needed
//                 FROM base AS deps /n
//                 # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed. \n
//                 RUN apk add --no-cache libc6-compat
//                 WORKDIR /app

//                 # Install dependencies based on the preferred package manager
//                 COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
//                 RUN \
//                   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
//                   elif [ -f package-lock.json ]; then npm ci; \
//                   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
//                   else echo "Lockfile not found." && exit 1; \
//                   fi


//                 # Rebuild the source code only when needed
//                 FROM base AS builder
//                 WORKDIR /app
//                 COPY --from=deps /app/node_modules ./node_modules
//                 COPY . .

//                 # Next.js collects completely anonymous telemetry data about general usage.
//                 # Learn more here: https://nextjs.org/telemetry
//                 # Uncomment the following line in case you want to disable telemetry during the build.
//                 # ENV NEXT_TELEMETRY_DISABLED 1

//                 RUN \
//                   if [ -f yarn.lock ]; then yarn run build; \
//                   elif [ -f package-lock.json ]; then npm run build; \
//                   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
//                   else echo "Lockfile not found." && exit 1; \
//                   fi

//                 # Production image, copy all the files and run next
//                 FROM base AS runner
//                 WORKDIR /app

//                 ENV NODE_ENV production
//                 # Uncomment the following line in case you want to disable telemetry during runtime.
//                 # ENV NEXT_TELEMETRY_DISABLED 1

//                 RUN addgroup --system --gid 1001 nodejs
//                 RUN adduser --system --uid 1001 nextjs

//                 COPY --from=builder /app/public ./public

//                 # Set the correct permission for prerender cache
//                 RUN mkdir .next
//                 RUN chown nextjs:nodejs .next

//                 # Automatically leverage output traces to reduce image size
//                 # https://nextjs.org/docs/advanced-features/output-file-tracing
//                 COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
//                 COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

//                 USER nextjs

//                 EXPOSE 3000

//                 ENV PORT=3000

//                 # server.js is created by next build from the standalone output
//                 # https://nextjs.org/docs/pages/api-reference/next-config-js/output
//                 CMD HOSTNAME="0.0.0.0" node server.js
//               '
//               fontSize='s'
//               fontWeight='light'
//             />
//           </FlexContainer>
//         </FlexContainer>
//       </PostContainer>
//     </FlexContainer>
//   )
// }

// const PostContainer = ({ children } : { children: React.ReactNode }) => {
//   return (
//     <div className={styles.postContainer}>
//       {children}
//     </div>
//   )
// }