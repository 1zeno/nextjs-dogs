"use client";

import React from "react";
import PhotoCommentsForm from "./photo-comments-form";
import styles from "./photo-comments.module.css";
import { useUser } from "@/context/UserContext";
import { Comment } from "@/actions/comment";

interface IProps {
    comments: Comment[];
    single: boolean;
    id: number;
}

const PhotoComments = (props: IProps) => {

    const [comments, setComments] = React.useState(props.comments);
    const commentsSection = React.useRef<HTMLUListElement | null>(null);
    const { user } = useUser();

    React.useEffect(()=>{
        if(commentsSection.current){
            commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
        }
    },[comments])

    return (
        <>
            <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ""}`}>
                {comments.map(comment =>
                    <li key={comment.comment_ID}>
                        <b>{comment.comment_author}: </b>
                        <span>{comment.comment_content}</span>
                    </li>
                )}
            </ul>
            {user && <PhotoCommentsForm id={props.id} setComments={setComments} single={props.single} />}
        </>
    )
}

export default PhotoComments;