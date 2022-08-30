import {Field, Formik} from "formik";
import React from "react";
import {FilterType} from "../../../redux/users_reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../../redux/users_selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}
type FormType = {
  term: string,
  friend: string
}
export const UsersSearchForm: React.FC<PropsType> = (props) => {
  const filter = useSelector(getUsersFilter)
  const submit = (values: FormType,
                  {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'false' ? false : true
    }
    props.onFilterChanged(filter)
    setSubmitting(false)
  }
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{term: filter.term, friend: String(filter.friend)}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
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
            <input
              type="text"
              name="term"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.term}
            />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}