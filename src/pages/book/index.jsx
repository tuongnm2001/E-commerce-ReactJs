import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";

const BookDetail = () => {

    const location = useLocation();

    const param = new URLSearchParams(location.search)

    const id = param?.get('id');



    console.log(id);

    return (
        <>
            <ViewDetail />
        </>
    );
}

export default BookDetail;