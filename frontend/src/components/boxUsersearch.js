import tw from "tailwind-styled-components"

export default function BoxUserSearch ({text, setText}) {

    const handleInputChange = ({target}) => {
        setText(target.value)
    }

    return(
        <Wrapper>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Search user..." value={text} onChange={handleInputChange}/>
            </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold bg-left-dark w-full h-10 p-3 rounded-tl-lg
`