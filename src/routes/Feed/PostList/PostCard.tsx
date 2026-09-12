import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.urlSlug}`}>
      <article>
        {data.thumbnail && (
          <div className="thumbnail">
            {/* 커버 비율이 글마다 1.5:1 ~ 5:1로 제각각이라 비율을 고정하지 않는다.
                실제 크기를 모르므로 next/image의 unknown dimension 패턴을 쓴다. */}
            <Image
              src={data.thumbnail}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
              alt={data.title}
            />
          </div>
        )}
        <div className="content">
          {category && (
            <div className="category">
              <Category>{category}</Category>
            </div>
          )}
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          <div className="date">
            <div className="content">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;

    @media (min-width: 768px) {
      margin-bottom: 2rem;
    }

    :hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }


    > .thumbnail {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      line-height: 0;
      /* 이미지가 로드되기 전에는 height: auto가 0이라 카드가 갑자기 늘어난다.
         미리 자리를 잡아둔다. 가장 납작한 커버(5:1)도 이 높이를 넘어서
         실제로는 여백이 생기지 않는다. */
      min-height: 6rem;

      img {
        width: 100%;
        /* 원본 비율 그대로 둔다. 잘리는 곳이 생기지 않는다. */
        height: auto;
        /* 세로로 긴 커버가 카드를 너무 길게 만들지 않도록 상한만 둔다.
           상한에 걸리면 잘라내지 않고 contain으로 여백을 준다. */
        max-height: 22rem;
        object-fit: contain;
      }
    }
    > .content {
      padding: 1rem;

      > .category {
        margin-bottom: 0.5rem;
      }
      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }
        h2 {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 500;

          cursor: pointer;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      }
      > .date {
        display: flex;
        margin-bottom: 1rem;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          @media (min-width: 768px) {
            margin-left: 0;
          }
        }
      }
      > .summary {
        margin-bottom: 1rem;
        p {
          display: none;
          line-height: 2rem;
          color: ${({ theme }) => theme.colors.gray11};

          @media (min-width: 768px) {
            display: block;
          }
        }
      }
      > .tags {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`
