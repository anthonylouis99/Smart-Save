

type headerProps={
    header?:string
     subHeader?:string
}

export const Header=({header,subHeader}:headerProps)=>{
    return(
        <div className="text-[var(--card-text)]">
            <p className="text-lg">
             {header}
            </p>

            <p className="text-sm">
             {subHeader}
            </p>
        </div>
    )

}