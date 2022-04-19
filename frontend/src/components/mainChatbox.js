import tw from "tailwind-styled-components"

export default function MainChatbox () {
    return(
        <Wrapper>
                <h1>Bienvenido al chat!</h1>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-red-400 border-4 mt-10 mr-40 ml-40 mb-10 h-screen bg-gray-300
`