import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <Image 
        src={CONFIG.blog.logo} 
        alt={CONFIG.blog.title} 
        width={300} 
        height={100}
        style={{ width: 'auto', height: '75px' }}
        priority
      />
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
  }
`