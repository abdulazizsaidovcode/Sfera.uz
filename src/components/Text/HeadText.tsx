import { TitleTextColor } from "../Colors"

const HeaderTitles = ({ text, size }: { text: string, size?: string }) => {
    return (
        <h1 className={`${size ? size : 'text-4xl'}   font-bold text-transparent bg-clip-text bg-gradient-to-r from-[${TitleTextColor}] to-[#4d7666]`}>
            {text}
        </h1>
    )
}

export default HeaderTitles