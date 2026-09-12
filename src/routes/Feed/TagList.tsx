import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { Emoji } from "src/components/Emoji"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag = router.query.tag || undefined
  const data = useTagsQuery()

  const handleClickTag = (value: any) => {
    // delete
    if (currentTag === value) {
      router.push({
        query: {
          ...router.query,
          tag: undefined,
        },
      })
    }
    // add
    else {
      router.push({
        query: {
          ...router.query,
          tag: value,
        },
      })
    }
  }

  return (
    <StyledWrapper>
      <div className="top">
        <Emoji>🏷️</Emoji> Tags
      </div>
      <div className="list">
        {Object.entries(data).map(([key, count]) => (
          <a
            key={key}
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            <span className="name">{key}</span>
            <span className="count">{count}</span>
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  .top {
    display: none;
    padding: 0.25rem;
    margin-bottom: 0.75rem;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  .list {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.25rem;
    overflow: scroll;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: block;
    }

    a {
      display: flex;
      align-items: center;
      /* 세로 목록에서는 개수를 오른쪽 끝으로 민다.
         가로 스크롤(모바일)에서는 폭이 내용만큼이라 gap만 적용된다. */
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0.25rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
      flex-shrink: 0;
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
      .count {
        font-size: 0.75rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.colors.gray9};
        font-variant-numeric: tabular-nums;
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray4};

        .count {
          color: ${({ theme }) => theme.colors.gray11};
        }

        :hover {
          background-color: ${({ theme }) => theme.colors.gray4};
        }
      }
    }
  }
`
