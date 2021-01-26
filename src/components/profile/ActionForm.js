import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useParams } from "react-router-dom";
import { getSinglePost, SavePost, EditPost } from "./actions";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

let initialValues = { title: "", body: "" };

export const ActionForm = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    if (id) {
      getSinglePost(id, setSingleData);
    }
    //   return () => {
    //       cleanup
    //   }
  }, [id]);

  return (
    <div className="container profile">
      <div className="profile-title">
        <h1>{id ? "Edit Post" : "Add Post"}</h1>
        <ToastContainer />
      </div>
      <div className="form">
        <Formik
          enableReinitialize={true}
          initialValues={id ? singleData : initialValues}
          validate={(values) => {
            // const errors = {};
            // if (!values.email) {
            //   errors.email = "Required";
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = "Invalid email address";
            // }
            // return errors;
          }}
          onSubmit={(values, { setSubmitting,resetForm }) => {
            if (id) {
                let payload = {
                    userId: 2,
                    title: values.title,
                    body: values.body,
                  };
                  EditPost(id,payload);
            } else {
              let payload = {
                userId: 2,
                title: values.title,
                body: values.body,
              };
              SavePost(payload,() => {
                resetForm(initialValues);
              });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                 Title
                </label>
                <Field
                  type="text"
                  name="title"
                  value={values.title}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Body
                </label>
                <textarea
                  class="form-control"
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  id="floatingTextarea"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
