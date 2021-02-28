import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import {
  ChallengeBox,
  CompletedChallenges,
  Countdown,
  ExperienceBar,
  Profile,
  Sidebar,
} from "../components";
import {
  ChallengesProvider,
  CountdownProvider,
  UserContext,
  UserProvider,
} from "../contexts/";
import Cookies from 'js-cookie'

import styles from "../styles/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps) {
  const { user, logIn } = useContext(UserContext);

  const [inputValue, setInputValue] = useState('')

  async function handleLoginSubmit() {

    const response = await axios.get(
      `https://api.github.com/users/${inputValue}`
    )

    // console.log(response.data)

    // const level = Cookies.get('level')
    // const currentExperience = Cookies.get('currentExperience')

    console.log(level)

    logIn(response.data.name, response.data.avatar_url, Number(level), Number(currentExperience))

    Cookies.set('name', response.data.name)
    Cookies.set('avatar_url', response.data.avatar_url)
  }

  return (
    <>
      { user ? (
        <ChallengesProvider
          level={level}
          currentExperience={currentExperience}
          challengesCompleted={challengesCompleted}
        >
          <Sidebar />
          <div className={styles.container}>
            <Head>
              <title>Início | MoveIt</title>
            </Head>
            <ExperienceBar />

            <CountdownProvider>
              <section>
                <div>
                  <Profile level={level} name={user.name} avatar={user.avatar} />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </ChallengesProvider>
      ) : (
        <UserProvider>
          <Head>
            <title>Login | MoveIt</title>
          </Head>
          <section className={styles.loginSection}>
              <div>
                <svg
                  width="700"
                  height="660"
                  viewBox="0 0 700 660"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.08">
                    <path
                      d="M287.527 0H454.433L315.582 660H148.677L287.527 0Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M533.502 0H700L592.08 518.4H425.542L533.502 0Z"
                      fill="url(#paint1_linear)"
                    />
                    <path
                      d="M39.9594 0H206.458L98.5377 518.4H-68L39.9594 0Z"
                      fill="url(#paint2_linear)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="301.555"
                      y1="0"
                      x2="301.555"
                      y2="660"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-opacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear"
                      x1="562.771"
                      y1="0"
                      x2="562.771"
                      y2="518.4"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-opacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear"
                      x1="69.2288"
                      y1="0"
                      x2="69.2288"
                      y2="518.4"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-opacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <img src="Logo-full.svg" alt="Move It"/>
                <strong className={styles.loginTitle}>Bem-vindo</strong>
                <p>
                  <img src="icons/github.svg" alt="GitHub"/>
                  Faça login com seu Github <br /> para começar
                </p>
                <div className={styles.loginInputGroup}>
                  <input className={styles.loginInput} value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} placeholder='Digite seu username'></input>
                  <button onClick={handleLoginSubmit}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.17939e-07 13.5L18.255 13.5L9.87 21.885L12 24L24 12L12 -1.04907e-06L9.885 2.115L18.255 10.5L1.18021e-06 10.5L9.17939e-07 13.5Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
        </UserProvider>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
