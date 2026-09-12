import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"

const Logo = () => {
  const [scheme] = useScheme()

  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <Image
        src={CONFIG.blog.logo[scheme]}
        alt={CONFIG.blog.title}
        width={1111}
        height={312}
        style={{ width: "auto", height: "40px" }}
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
