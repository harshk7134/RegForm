import React,{useEffect,useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastName: Yup.string().required('Last Name is required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  countries: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required').test('age', 'Age must be above 14', (value) => {
    if (!value) return false;
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age > 14) {
      return true;
    }
    return false;
  })
});



export default function Form() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      countries: '',
      state: '',
      city: '',
      gender: '',
      dateOfBirth: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission, e.g., make API call to save the data
      console.log(values);
    },
  });
  
  useEffect(() => {
    // Fetch countries from API
    fetchCountries();

    // Fetch states based on selected country
    if (formik.values.countries) {
      fetchStates(formik.values.countries);
    }

    // Fetch cities based on selected state
    if (formik.values.state) {
      fetchCities(formik.values.state);
    }
  }, [formik.values.countries, formik.values.state]);
  const fetchCountries = () => {
    // Make an API call to fetch the list of countries
    // Update the 'countries' state with the fetched data
    // Example:
    fetch('http://localhost:3300/api/countries')
      .then((response) => response.json())
      .then((data) =>{
      console.log('Fetched countries:', data);
      setCountries(data) }) 
      .catch((error) => console.error(error));
  };

  const fetchStates = (country) => {
    // Make an API call to fetch the list of states for the selected country
    // Update the 'states' state with the fetched data
    // Example:
    fetch(`http://localhost:3300/api/states?country=${country}`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error(error));
  };

  const fetchCities = (state) => {
    // Make an API call to fetch the list of cities for the selected state
    // Update the 'cities' state with the fetched data
    // Example:
    fetch(`http://localhost:3300/api/cities?state=${state}`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error(error));
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = differenceInYears(today, birthDate);
  
    formik.setFieldValue('age', age);
  };

  return (
    <div className="container my-4">
        
      <div className="row justify-content-center">
      
        <div className="col-lg-6">
        <h2>Registration Form</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                  <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-danger">{formik.errors.firstName}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-danger">{formik.errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
        <label htmlFor="country" className="col-sm-3 col-form-label">
          Country
        </label>
        <div className="col-sm-9">
          <select
            id="country"
            name="countries"
            className="form-control"
            value={formik.values.countries}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {formik.touched.countries && formik.errors.countries && (
            <div className="text-danger">{formik.errors.countries}</div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="state" className="col-sm-3 col-form-label">
          State
        </label>
        <div className="col-sm-9">
          <select
            id="state"
            name="state"
            className="form-control"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="text-danger">{formik.errors.state}</div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="city" className="col-sm-3 col-form-label">
          City
        </label>
        <div className="col-sm-9">
          <select
            id="city"
            name="city"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {formik.touched.city && formik.errors.city && (
            <div className="text-danger">{formik.errors.city}</div>
          )}
        </div>
      </div>

                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Gender</label>
                  <div className="col-sm-9">
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="genderMale"
                        name="gender"
                        value="male"
                        className="form-check-input"
                        checked={formik.values.gender === 'male'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label htmlFor="genderMale" className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="genderFemale"
                        name="gender"
                        value="female"
                        className="form-check-input"
                        checked={formik.values.gender === 'female'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label htmlFor="genderFemale" className="form-check-label">Female</label>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                      <div className="text-danger">{formik.errors.gender}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="dateOfBirth" className="col-sm-3 col-form-label">Date of Birth</label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control"
                      value={formik.values.dateOfBirth}
                      onChange={(e) => {
                        formik.handleChange(e);
                        calculateAge(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                      <div className="text-danger">{formik.errors.dateOfBirth}</div>
                    )}
                  </div>
                </div>

              <div className="row mb-3">
                <label htmlFor="age" className="col-sm-3 col-form-label">Age</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    id="age"
                    name="age"
                    className="form-control"
                    value={formik.values.age}
                    readOnly
                  />
                </div>
              </div>

                <div className="row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="submit" className="btn btn-primary">Save and Display</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
