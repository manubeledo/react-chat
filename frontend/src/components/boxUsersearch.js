import tw from "tailwind-styled-components"

export default function BoxUserSearch () {
    return(
        <Wrapper>
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
text-3xl font-bold bg-left-dark w-full h-1/12 p-4 border-1 rounded-tl-lg
`