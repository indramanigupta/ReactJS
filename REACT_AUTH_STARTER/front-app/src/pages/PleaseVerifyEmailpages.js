import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const PleaseVerifyEmailPage = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, [history]);

  return (
    <div className="content-container">
      <h1>Thanks for signing up!</h1>

      <p>
        A verification email has been sent to your personal email you provided.
        Please verify your email to unloack you site features.!
      </p>
    </div>
  );
};
