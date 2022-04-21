import tw from "tailwind-styled-components"
import BoxUserSearch from "./boxUsersearch"
import BoxUserbox from "./boxUserbox"

export default function BoxUserState () {
    return(
        <Wrapper>
            <BoxUserSearch/>
            <BoxUserbox></BoxUserbox>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-blue-400 border-4 bg-gray-300 w-3/12 text-center
`