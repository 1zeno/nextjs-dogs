"use client";

import React from "react";
import FeedModal from "./feed-modal";
import styles from "./feed.module.css";
import { getPhotos, PhotoDetails } from "@/actions/photo";
import FeedPhoto from "./feed-photo";
import Loading from "@/helper/loading";

interface IProps {
    data: PhotoDetails[];
    params: {
        page: number,
        total: number,
        user: number,
    }
}

const Feed = (props: IProps) => {

    const [modalPhoto, setModalPhoto] = React.useState<PhotoDetails | null>(null);
    const [page, setPage] = React.useState(props.params.page);
    const [infinite, setInfinite] = React.useState(true);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<PhotoDetails[][]>([props.data]);

    React.useEffect(() => {
        if (page === 1) return;
        async function fetchPhotos() {
            setLoading(true);
            const total = 3;
            try {
                const response = await getPhotos({ page, total, user: props.params.user });
                if (!response.ok) {
                    setError(response.error)
                    return;
                }
                if (response.data.length < total) {
                    setInfinite(false);
                }
                setData([...data, response.data]);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }

        }
        fetchPhotos();
    }, [page, setInfinite])

    React.useEffect(() => {
        let wait = false;
        function infiniteScroll() {
            if (infinite) {
                const scroll = window.scrollY;
                const height = document.body.offsetHeight - window.innerHeight;

                if (scroll > height * 0.75 && !wait) {
                    setPage((value) => value + 1)
                    wait = true;
                    setTimeout(() => {
                        wait = false;
                    }, 500);
                }
            }
        }
        window.addEventListener("wheel", infiniteScroll);
        window.addEventListener("scroll", infiniteScroll);

        return () => {
            window.removeEventListener("wheel", infiniteScroll);
            window.removeEventListener("scroll", infiniteScroll);
        }
    }, [infinite])

    return (
        <>
            {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
            {data.map((photos, index) => (
                <ul className={`${styles.feed} animeLeft`} key={index}>
                    {photos.map(photo => (
                        <FeedPhoto
                            key={photo.id}
                            photo={photo}
                            setModalPhoto={setModalPhoto}
                            index={index}
                        />
                    ))}
                </ul>
            ))}
            {loading && (
                <Loading />
            )}
        </>
    )
}

export default Feed;