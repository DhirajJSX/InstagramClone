import React from 'react'
import ContentLoader from 'react-content-loader'

const EventsLoader = props => (
  <ContentLoader
    width={700}
    height={300}
    viewBox="0 0 700 300"
    // backgroundColor="#f5f5f5"
    foregroundColor="#515151"
    backgroundColor="rgba(0,0,0,10.30)"
    {...props}
  >
    
    <circle cx="128" cy="120" r="120" />
    {/* <rect x="412" y="113" rx="3" ry="3" width="102" height="7" /> */}
    <rect x="288" y="70" rx="3" ry="3" width="178" height="25" />
    {/* <rect x="405" y="139" rx="3" ry="3" width="178" height="6" /> */}
    {/* <rect x="416" y="162" rx="3" ry="3" width="102" height="7" /> */}
    {/* <rect x="405" y="189" rx="3" ry="3" width="178" height="6" /> */}
    <rect x="290" y="120" rx="14" ry="14" width="72" height="45" />
    <rect x="400" y="120" rx="14" ry="14" width="72" height="45" />

    <rect x="520" y="120" rx="14" ry="14" width="72" height="45" />
    
    <rect x="10" y="250" rx="3" ry="3" width="231" height="12" />
    <rect x="10" y="270" rx="3" ry="3" width="231" height="12" />
    <rect x="10" y="290" rx="3" ry="3" width="231" height="10" />
  </ContentLoader>
)

EventsLoader.metadata = {
  name: 'Sridhar Easwaran',
  github: 'sridhareaswaran',
  description: 'Events',
  filename: 'EventsLoader',
}

export default EventsLoader