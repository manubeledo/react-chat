import tw from "tailwind-styled-components"

export default function BoxChatBox () {
    return(
        <Wrapper>
                <h6>BoxChatBox</h6>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-4/6 text-center
`