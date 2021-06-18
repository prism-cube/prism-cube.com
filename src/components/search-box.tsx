import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import React from 'react'

const SearchPaper = styled(Paper)`
  padding: 1rem;
  margin-bottom: 1rem;
`
const HeadingSpan = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`
const HeadingIcon = styled.span`
  margin-right: 0.25rem;
  display: flex;
  align-items: center;
`

SearchBox.defaultProps = {
  word: '',
};

export default function SearchBox({word}: {word: string}) {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>(word)

  const clickButton = () => {
    if (!keyword) {
      return
    }

    router.push({
      pathname: '/articles/search',
      query: { q: keyword }
    })
  }

  return (
    <SearchPaper>
      <HeadingSpan>
        <HeadingIcon>
          <SearchIcon />
        </HeadingIcon>
        Search
      </HeadingSpan>

      <OutlinedInput
        id="search-input"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            clickButton();
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Search"
              onClick={clickButton}
              disabled={!keyword}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </SearchPaper>
  )
}
