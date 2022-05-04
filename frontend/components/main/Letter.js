import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const color1 = ["#DA4C1F", "#8A3EC6", "#3EA5C6", "#FF0000", "#b5b5f5"];
const color2 = ["#76E3FB", "#391FDA", "#FFCC49", "#391FDA", "pink"];
const bg = ["white", "#ECDDBE", "#FDF1E3", "#FFFFE1", "#FDF1E3"];
const href = ["letter/select", "mail/inbox", "mail/sent", "mail/storage"];

function Letter({
  text,
  index,
  createdDate,
  main,
  senderName,
  setSelectedMail,
  mailId,
  handlePage,
  switchPage,
  mailType,
}) {
  const router = useRouter();

  const handleMainClick = (e) => {
    e.preventDefault();
    router.push(href[index]);
  };
  const handleInboxClick = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        fontSize: 26,
        fontFamily: "Gowun Batang",
        mb: main ? (index === 3 ? 3 : 2) : 2,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={
        handlePage
          ? (e) => handlePage(mailId)
          : switchPage
          ? (e) => switchPage(mailId)
          : main
          ? handleMainClick
          : handleInboxClick
      }
    >
      <svg
        width="320"
        height="204"
        viewBox="0 0 348 204"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="347"
          height="203"
          fill={bg[4]}
          stroke="black"
        />
        <rect
          x="3.5"
          y="3.5"
          width="340"
          height="196"
          fill={bg[index]}
          stroke="black"
        />

        {main && (
          <line x1="200" y1="130.5" x2="314.629" y2="130.5" stroke="black" />
        )}
        {main && (
          <line
            x1="200"
            y1="169.305"
            x2="314.629"
            y2="169.305"
            stroke="black"
          />
        )}
        {main && (
          <line x1="200" y1="156.37" x2="314.629" y2="156.37" stroke="black" />
        )}
        {main && (
          <line
            x1="200"
            y1="143.435"
            x2="314.629"
            y2="143.435"
            stroke="black"
          />
        )}
        <path d="M341 7V21L333 29V15L341 7Z" fill={color1[index]} />
        <path d="M341 23V37L333 45V31L341 23Z" fill={color2[index]} />
        <path d="M341 39V53L333 61V47L341 39Z" fill={color1[index]} />
        <path d="M341 55V69L333 77V63L341 55Z" fill={color2[index]} />
        <path d="M341 71V85L333 93V79L341 71Z" fill={color1[index]} />
        <path d="M341 103V117L333 125V111L341 103Z" fill={color1[index]} />
        <path d="M341 87V101L333 109V95L341 87Z" fill={color2[index]} />
        <path d="M341 119V133L333 141V127L341 119Z" fill={color2[index]} />
        <path d="M341 135V149L333 157V143L341 135Z" fill={color1[index]} />
        <path d="M341 151V165L333 173V159L341 151Z" fill={color2[index]} />
        <path d="M341 167V181L333 189V175L341 167Z" fill={color1[index]} />
        <path d="M14 14L14 28L6 36V22L14 14Z" fill={color1[index]} />
        <path d="M14 30L14 44L6 52V38L14 30Z" fill={color2[index]} />
        <path d="M14 46L14 60L6 68V54L14 46Z" fill={color1[index]} />
        <path d="M14 62L14 76L6 84V70L14 62Z" fill={color2[index]} />
        <path d="M14 78L14 92L6 100V86L14 78Z" fill={color1[index]} />
        <path d="M14 110L14 124L6 132V118L14 110Z" fill={color1[index]} />
        <path d="M14 94L14 108L6 116V102L14 94Z" fill={color2[index]} />
        <path d="M14 126L14 140L6 148V134L14 126Z" fill={color2[index]} />
        <path d="M14 142L14 156L6 164V150L14 142Z" fill={color1[index]} />
        <path d="M14 158L14 172L6 180V166L14 158Z" fill={color2[index]} />
        <path d="M14 174L14 188L6 196V182L14 174Z" fill={color1[index]} />
        <path d="M341 197H327L341 183V197Z" fill={color2[index]} />
        <path d="M6 6H20L6 20V6Z" fill={color2[index]} />
        <path d="M340 6H326L318 14H332L340 6Z" fill={color2[index]} />
        <path d="M324 6H310L302 14H316L324 6Z" fill={color1[index]} />
        <path d="M308 6H294L286 14H300L308 6Z" fill={color2[index]} />
        <path d="M292 6H278L270 14H284L292 6Z" fill={color1[index]} />
        <path d="M276 6H262L254 14H268L276 6Z" fill={color2[index]} />
        <path d="M260 6H246L238 14H252L260 6Z" fill={color1[index]} />
        <path d="M228 6H214L206 14H220L228 6Z" fill={color1[index]} />
        <path d="M244 6H230L222 14H236L244 6Z" fill={color2[index]} />
        <path d="M212 6H198L190 14H204L212 6Z" fill={color2[index]} />
        <path d="M196 6H182L174 14H188L196 6Z" fill={color1[index]} />
        <path d="M180 6H166L158 14H172L180 6Z" fill={color2[index]} />
        <path d="M164 6H150L142 14H156L164 6Z" fill={color1[index]} />
        <path d="M148 6H134L126 14H140L148 6Z" fill={color2[index]} />
        <path d="M132 6H118L110 14H124L132 6Z" fill={color1[index]} />
        <path d="M116 6H102L94 14H108L116 6Z" fill={color2[index]} />
        <path d="M100 6H86L78 14H92L100 6Z" fill={color1[index]} />
        <path d="M68 6H54L46 14H60L68 6Z" fill={color1[index]} />
        <path d="M52 6H38L30 14H44L52 6Z" fill={color2[index]} />
        <path d="M84 6H70L62 14H76L84 6Z" fill={color2[index]} />
        <path d="M36 6H22L14 14H28L36 6Z" fill={color1[index]} />
        <path d="M333 189H319L311 197H325L333 189Z" fill={color1[index]} />
        <path d="M317 189H303L295 197H309L317 189Z" fill={color2[index]} />
        <path d="M301 189H287L279 197H293L301 189Z" fill={color1[index]} />
        <path d="M285 189H271L263 197H277L285 189Z" fill={color2[index]} />
        <path d="M269 189H255L247 197H261L269 189Z" fill={color1[index]} />
        <path d="M237 189H223L215 197H229L237 189Z" fill={color1[index]} />
        <path d="M253 189H239L231 197H245L253 189Z" fill={color2[index]} />
        <path d="M221 189H207L199 197H213L221 189Z" fill={color2[index]} />
        <path d="M205 189H191L183 197H197L205 189Z" fill={color1[index]} />
        <path d="M189 189H175L167 197H181L189 189Z" fill={color2[index]} />
        <path d="M173 189H159L151 197H165L173 189Z" fill={color1[index]} />
        <path d="M157 189H143L135 197H149L157 189Z" fill={color2[index]} />
        <path d="M141 189H127L119 197H133L141 189Z" fill={color1[index]} />
        <path d="M125 189H111L103 197H117L125 189Z" fill={color2[index]} />
        <path d="M109 189H95L87 197H101L109 189Z" fill={color1[index]} />
        <path d="M77 189H63L55 197H69L77 189Z" fill={color1[index]} />
        <path d="M61 189H47L39 197H53L61 189Z" fill={color2[index]} />
        <path d="M29 189H15L7 197H21L29 189Z" fill={color2[index]} />
        <path d="M93 189H79L71 197H85L93 189Z" fill={color2[index]} />
        <path d="M45 189H31L23 197H37L45 189Z" fill={color1[index]} />
        <path d="M14 14L14 28L6 36V22L14 14Z" fill={color1[index]} />
        <path d="M14 30L14 44L6 52V38L14 30Z" fill={color2[index]} />
        <path d="M14 46L14 60L6 68V54L14 46Z" fill={color1[index]} />
        <path d="M14 62L14 76L6 84V70L14 62Z" fill={color2[index]} />
        <path d="M14 78L14 92L6 100V86L14 78Z" fill={color1[index]} />
        <path d="M14 110L14 124L6 132V118L14 110Z" fill={color1[index]} />
        <path d="M14 94L14 108L6 116V102L14 94Z" fill={color2[index]} />
        <path d="M14 126L14 140L6 148V134L14 126Z" fill={color2[index]} />
        <path d="M14 142L14 156L6 164V150L14 142Z" fill={color1[index]} />
        <path d="M14 158L14 172L6 180V166L14 158Z" fill={color2[index]} />
        <path d="M14 174L14 188L6 196V182L14 174Z" fill={color1[index]} />
        <path d="M341 197H327L341 183V197Z" fill={color2[index]} />
        <path d="M6 6H20L6 20V6Z" fill={color2[index]} />
      </svg>
      {!main ? (
        <Typography
          sx={{
            position: "absolute",
            width: 1,
            top: 50,
            left: 80,
            width: "250px",
            display: "flex",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "block",
            fontSize: 18,
            fontFamily: "Gowun Dodum",
          }}
        >
          {text}
        </Typography>
      ) : (
        <Typography
          sx={{
            position: "absolute",
            width: 1,
            top: 50,
            left: 90,
            width: "250px",
            display: "flex",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "block",
            fontSize: 22,
            // fontWeight: "bold",
            fontFamily: "Gowun Dodum",
          }}
        >
          {text}
        </Typography>
      )}
      {!main ? (
        <Box
          sx={{
            position: "absolute",
            top: 130,
            right: 80,
            width: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ fontSize: 12, fontFamily: "Gowun Dodum" }}>
            {senderName}
          </Typography>
          {createdDate && !handlePage ? (
            <Typography sx={{ fontSize: 12, fontFamily: "Gowun Dodum" }}>
              {index ? "엽서, " : "일반, "}
              {/* {createdDate} */}
              {createdDate.slice(0, 4)}년 {createdDate.slice(5, 7)}월{" "}
              {createdDate.slice(8, 10)}일
            </Typography>
          ) : null}
          {createdDate && handlePage ? (
            <Typography sx={{ fontSize: 12, fontFamily: "Gowun Dodum" }}>
              {mailType
                ? mailType === "GENERAL"
                  ? "일반, "
                  : mailType === "POSTCARD"
                  ? "엽서, "
                  : "포토카드, "
                : null}
              {createdDate.slice(0, 4)}년 {createdDate.slice(5, 7)}월{" "}
              {createdDate.slice(8, 10)}일
            </Typography>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
export default Letter;
