import styled from '@emotion/styled'
import React from 'react'
import isDevelopment from '../../isDevelopment'

const DevBanner = () => isDevelopment() ? <Banner>{[0, 1, 2, 3, 4, 5, 6].map(_ => <span key={_}>Development Mode</span>)}</Banner> : <></>

const Banner = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: fixed;
z-index: 9999;
background-color: red;
width: 100%;
height: 18px;
top: 0;
gap: 60px;
`

export default DevBanner