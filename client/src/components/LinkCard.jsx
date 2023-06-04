
// eslint-disable-next-line react/prop-types
export const  LinkCard = ({link}) => {
    return (
            <>
            <h2>Link:</h2>

                <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer" >{link.to}</a></p>
                <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer" >{link.from}</a></p>
                <p>Count cliks: <strong>{link.cliks}</strong></p>
                <p>Created at: <strong>{new Date(link.date).toLocaleDateString()}</strong> </p>
            </>
    );
}

