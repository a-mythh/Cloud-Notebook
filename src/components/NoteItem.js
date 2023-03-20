import React from "react";

const NoteItem = (props) => {
    const { note } = props;

    return (
        <div className="col-md-4">
            <div className="card my-3 text-center">
                <div className="card-header">Note #1</div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                        {note.description} Lorem ipsum, dolor sit amet
                        consectetur adipisicing elit. Amet doloremque iste unde
                        libero dicta inventore sequi hic, debitis et nihil
                        minima cumque accusamus aut veniam consectetur dolores
                        laboriosam. Ipsum iure itaque commodi autem. Cumque
                        deleniti deserunt suscipit. Necessitatibus voluptates
                        cumque quos consequatur nam unde eum atque libero
                        corrupti exercitationem. Numquam.
                    </p>
                    <a href="/" className="btn btn-primary mx-3">
                        Edit
                    </a>
                    <a href="/" className="btn btn-primary">
                        Delete
                    </a>
                </div>
                <div className="card-footer text-muted">{note.date}</div>
            </div>
        </div>
    );
};

export default NoteItem;
