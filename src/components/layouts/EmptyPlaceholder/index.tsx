type EmptyPlaceholderProps = {
    title: string
}

export const EmptyPlaceholder = (props: EmptyPlaceholderProps) => {
    return (
        <div className='text-center w-full dark:text-slate-300'>
            <p>No available {props.title}</p>
        </div>
    )
}