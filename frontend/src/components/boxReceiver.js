import tw from "tailwind-styled-components"

export default function BoxReceiver () {
    return(
        <Wrapper>
                <h6>BoxReceiver</h6>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-red-400 border-4 bg-gray-300 w-full h-1/6 text-center
`