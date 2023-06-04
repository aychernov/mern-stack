import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LinksList({links}) {

    // eslint-disable-next-line react/prop-types
    if(!links.length) {
        return <p className='center'>No links</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, idx) => {
                return (
                    <tr key={link._id} >
                        <td>{idx + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}> Open </Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}

export default LinksList;
