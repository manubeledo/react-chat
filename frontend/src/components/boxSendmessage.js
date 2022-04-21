import tw from "tailwind-styled-components"

export default function BoxSendMessage () {
    return(
        <Wrapper>
                <h6>BoxSendMessage</h6>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-1/6 text-center
`