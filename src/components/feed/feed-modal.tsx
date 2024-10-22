import React from "react";
import styles from "./feed-modal.module.css";
import ErrorMessage from "@/helper/error-message";
import Loading from "@/helper/loading";
//import PhotoContent from "../Photo/PhotoContent";
import { getPhotoById, PhotoDetails } from "@/actions/photo";

interface IProps {
    photo: PhotoDetails;
    setModalPhoto: React.Dispatch<React.SetStateAction<null | PhotoDetails>>;
}

const FeedModal = ({photo, setModalPhoto}: IProps) => {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<PhotoDetails | null>(null);

    function handleOutsideClick(event: React.MouseEvent<HTMLElement>){
        if(event.target === event.currentTarget){
            setModalPhoto(null);
        }
    }

    React.useEffect(()=>{
        async function fetch() {
            setLoading(true);
            try {
                const response = await getPhotoById(photo.id);
                if(!response.ok){
                    setError(response.error)
                    return;
                }
                setData(response.data);
            } catch (error: unknown) {
                if(error instanceof Error){
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        fetch();
    },[])

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <ErrorMessage error={error} />}
            {loading && <Loading/>}
            {data && (
                <>
                <h1>deubom</h1>
                {/*<PhotoContent data={data} />*/}
                </>
            )}
        </div>
    )
}

export default FeedModal;