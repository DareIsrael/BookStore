import React from "react";
import styles from "./About.module.css";
import { useNavigate } from "react-router-dom";




const About = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Winifred</h1>
          <p className={styles.heroSubtitle}>Wife, Mom, Goal Coach to ambitious Women</p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          {/* Image on the left */}
          <div className={styles.imageContainer}>
            <img 
              src="https://res.cloudinary.com/dvntutcf4/image/upload/v1757513493/IMG_0885_puxyon.jpg" 
              alt="Winifred - Author and Coach" 
              className={styles.aboutImage}
            />
          </div>
          
          {/* Text content on the right */}
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>My Story</h2>
            <div className={styles.aboutText}>
              <p>
                Hi, I’m Winifred — a wife, a mom to two little lights of the world, and a Goal Coach for godly ambitious women. My mission is to help women gain clarity, build belief, embrace discipline, and align with their God-given purpose so they can rise with confidence and live fulfilled lives.

              </p>
              <p>
                My story is rooted in faith. From a young age, I believed our lives were meant to shine as lights for God, and I’ve carried that conviction into motherhood, ministry, and coaching. Today, I walk alongside women who know they’re called to more but need structure, support, and strategy to get there — without losing sight of who they are in Christ.

              </p>
              <p>
                I also serve as a volunteer kids’ educator in church, and it was there that my love for children’s discipleship grew. That passion later inspired me to create Christ-centered books and resources that help families introduce little ones to their true identity in Christ.

              </p>
              <p>
                Through my frameworks and one-on-one work, I help ambitious women move from scattered to focused, from uncertain to clear, and from overwhelmed to aligned. Because when women rise in clarity and purpose, they not only transform their own lives but also influence their families, communities, and the next generation.

              </p>
              <p>
               At the heart of everything, I’m a woman who loves Jesus, loves people, and believes in building a life that is both purposeful and impactful.
              </p>
              {/* <p>
                At the heart of it all, I'm just a woman who loves Jesus, loves people, and believes every child deserves to know they are chosen, loved, and created with a divine purpose.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionContent}>
          <h2 className={styles.missionTitle}>My Mission</h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>📚</div>
              <h3>Create Inspiring Resources</h3>
              <p>Developing Christian children's books that make God's Word accessible and engaging for young hearts</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>👩‍👧‍👦</div>
              <h3>Support Families</h3>
              <p>Equipping parents with tools to nurture faith and spiritual growth in their children</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>🌟</div> {/* Fixed this line */}
              <h3>Coach Women</h3>
              <p>Helping godly ambitious women discover and fulfill their God-given purpose</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Join Me on This Journey</h2>
          <p className={styles.ctaText}>
            Whether you're a parent looking for resources to nurture your child's faith or a woman seeking purpose and direction, I'd love to connect with you and support your journey.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaButtonPrimary} onClick={() => navigate("/books")}
>           Explore Books
            </button>
            <button className={styles.ctaButtonSecondary}>Learn About Coaching</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;