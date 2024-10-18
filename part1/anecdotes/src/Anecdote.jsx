const Anecdote = ({anecdote, votes}) => {

    return (
        <div>
            <div>{anecdote}</div>
            <div>has {votes} votes</div>
        </div>
    )

}

export default Anecdote