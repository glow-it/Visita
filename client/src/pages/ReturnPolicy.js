import React, { useEffect } from "react";

function ReturnPolicy() {
  useEffect(() => {
    document.title = "Return Policy - Visita";
  }, []);

  return (
    <div>
      <div
        data-custom-class="body"
        className="pt-44  pb-44 flex flex-col px-44 items-center text-center font-medium"
      >
        <div>
          <div
            align="center"
            className="MsoNormal"
            style={{ textAlign: "center", lineHeight: "115%" }}
          >
            <a name="_2cipo4yr3w5d" />
            <div
              align="center"
              className="MsoNormal"
              style={{ textAlign: "center", lineHeight: "150%" }}
            >
              <strong>
                <span style={{ fontSize: "46px" }}>
                  <span data-custom-class="title" className="font-bold text-blue-600">Return Policy</span>
                </span>
              </strong>
            </div>
            <div
              align="center"
              className="MsoNormal"
              style={{ textAlign: "center", lineHeight: "150%" }}
            >
              <br />
            </div>
            <div
              align="center"
              className="MsoNormal"
              style={{ textAlign: "center", lineHeight: "150%" }}
            >
              <span style={{ fontSize: "15px" }}>
                <span style={{ color: "rgb(89, 89, 89)" }}>
                  <strong>
                    <span data-custom-class="subtitle">
                      Last updated{" "}
                      <bdt className="question">January 30, 2023</bdt>
                    </span>
                  </strong>
                </span>
              </span>
            </div>
            <div
              align="center"
              className="MsoNormal"
              style={{ textAlign: "center", lineHeight: "150%" }}
            >
              <br />
            </div>
            <div
              align="center"
              className="MsoNormal"
              style={{ textAlign: "center", lineHeight: "150%" }}
            >
              <span style={{ fontSize: "15px" }}>
                <br />
                <a name="_2cipo4yr3w5d" />
              </span>
            </div>
          </div>
          <div
            className="MsoNormal"
            data-custom-class="body_text"
            style={{ lineHeight: "1.5" }}
          >
            <span
              style={{
                fontSize: "15px",
                lineHeight: "115%",
                fontFamily: "Arial",
                color: "rgb(89, 89, 89)",
              }}
            >
              <bdt className="block-component" />
            </span>
          </div>
          <div data-custom-class="heading_1">
            <strong>
              <span style={{ fontSize: "19px" }}>REFUNDS</span>
            </strong>
          </div>
          <div style={{ lineHeight: "1.5" }}>
            <br />
          </div>
          <div data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
            <span style={{ fontSize: "15px" }}>
              All sales are final and no refund will be issued.
              <bdt className="block-component" />
            </span>
          </div>
          <div style={{ lineHeight: "1.5" }}>
            <br />
          </div>
          <div data-custom-class="heading_1" style={{ lineHeight: "1.5" }}>
            <span style={{ fontSize: "19px", color: "rgb(0, 0, 0)" }}>
              <strong>QUESTIONS</strong>
            </span>
          </div>
          <div style={{ lineHeight: "1.5" }}>
            <br />
          </div>
          <div data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
            <span style={{ fontSize: "15px", color: "rgb(89, 89, 89)" }}>
              If you have any questions concerning our return policy, please
              contact us at:
            </span>
          </div>
          <div data-custom-class="body_text" style={{ lineHeight: "1.1" }}>
            <br />
          </div>
          <div data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
            <span style={{ fontSize: "15px" }}>
              <bdt className="block-component" />
            </span>
          </div>
          <div data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
            <span style={{ fontSize: "15px", color: "rgb(89, 89, 89)" }}>
              <bdt className="question">team@visitasmart.com</bdt>
            </span>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n      ul {\n        list-style-type: square;\n      }\n      ul > li > ul {\n        list-style-type: circle;\n      }\n      ul > li > ul > li > ul {\n        list-style-type: square;\n      }\n      ol li {\n        font-family: Arial ;\n      }\n    ",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
