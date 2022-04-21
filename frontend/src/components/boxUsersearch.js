import tw from "tailwind-styled-components"

export default function BoxUserSearch () {
    return(
        <Wrapper>
            <h6>BoxUserSearch</h6>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Search..."/>
            </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-1/6 text-center
`