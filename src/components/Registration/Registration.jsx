import { Button } from "../Button/Button";
import { useState, useEffect, useCallback } from "react";
import { postUser, getToken, getPositions } from "../../api";

export const Registration = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isDataSent, setIsDataSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: 0,
    photo: null,
  });
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    phone: true,
    photo: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPositions();
        setPositions(data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (isDataSent) {
      const timer = setTimeout(() => {
        setIsDataSent(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isDataSent]);

  const isActive = () => {
    if (formData.name && formData.email && formData.phone && formData.position_id && formData.photo) {
      return true
    }

    return false
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'position_id' ? parseInt(value, 10) : value;
  
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const result = await postUser(formData, token);
      setIsDataSent(true);
      console.log("Дані успішно відправлено:", result);
    } catch (error) {
      console.error("Помилка відправлення даних:", error);
    } finally {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position_id: 0,
        photo: null,
      });
    }
  };

  console.log(formData);

  const validateForm = useCallback(() => {
    const isNameValid = formData.name.length >= 2 && formData.name.length <= 60;
    const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    const isEmailValid = emailRegex.test(formData.email) && formData.email.length >= 2 && formData.email.length <= 100;
    const phoneRegex = /^(\+380[0-9]{9})$/;
    const isPhoneValid = phoneRegex.test(formData.phone);
    const isPositionValid = formData.position_id >= 1;
    const isPhotoValid = formData.photo !== null && formData.photo.size <= 5 * 1024 * 1024;
  
    setValidation({
      name: isNameValid,
      email: isEmailValid,
      phone: isPhoneValid,
      position_id: isPositionValid,
      photo: isPhotoValid,
    });
  }, [formData]);

  useEffect(() => {
    const runValidation = async () => {
      validateForm();
    };

    runValidation();
  }, [validateForm]);

  return (
    <section className="registration" id="sign_up">
      <h2 className="registration__title">Working with POST request</h2>

      <div className="registration__form-container">
        <form
          className="registration__form"
          onSubmit={handleSubmit}
        >
          <div className="registration__form-input_wrapper">
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              className={validation.name ? "registration__form-input" : "registration__form-input input-error"}
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className={validation.email ? "registration__form-input" : "registration__form-input input-error"}
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              className={`${validation.phone ? "registration__form-input" : "registration__form-input input-error"} registration__form-input--last`}
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <small className="registration__remark">+38 (XXX) XXX - XX - XX</small>
          </div>

          <div className="registration__form-radio_wrapper">
            <p className="registration__form-radio_title">Select your position</p>

            {positions.map(position => (
              <div className="registration__form-radio_optionWrapper" key={position.id}>
                <input 
                  type="radio" 
                  id={position.id} 
                  name="position_id" 
                  value={position.id} 
                  className="registration__form-radio_option"
                  onChange={handleInputChange} 
                />
                <label htmlFor={position.id}>{position.name}</label>
              </div>
            ))}
          </div>

          <div className="registration__form-imgUploadWrapper">
            <input 
              type="file" 
              id="photo" 
              name="photo" 
              accept="image/*" 
              required 
              className="registration__form-imgUpload"
              onChange={handleFileChange}
            />
            <label htmlFor="photo" className="registration__form-customInput">
              <span className="registration__form-customInput_button">Upload</span>
              <span className="registration__form-customInput_field">
                {selectedFile ? `${selectedFile.name}` : "Upload your photo"}
              </span>
            </label>
          </div>

          <Button 
            text={"Sign up"} isActive={isActive()} type={"registration"} 
          />
        </form>
      </div>

      {isDataSent && (
        <div className="registration__success-message fade-in-out">
          <img src="/dist/images/successimage.svg" alt="successfull" />
        </div>
      )}
    </section>
  )
}