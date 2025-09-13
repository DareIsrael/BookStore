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
          <p className={styles.heroSubtitle}>Mom, Author, and Goal Coach for Women of Faith</p>
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
                Hi, I'm Winifred — a mom to two little lights of the world, a Goal Coach for godly ambitious women, and an author passionate about helping children discover who they are in Christ.
              </p>
              <p>
                My story is deeply rooted in faith. From a young age, I've believed that our lives are meant to shine as lights for God, and I've carried that conviction into motherhood, ministry, and my work.
              </p>
              <p>
                As a volunteer kids' educator in church, I've had the privilege of teaching little ones about God's Word in simple, creative, and joyful ways. It's there, sitting on the floor with crayons, storybooks, and Bible verses, that I saw how children's hearts are wide open to God's truth. This experience sparked my passion for creating Christ-centered resources that help families disciple their children at home.
              </p>
              <p>
                Through my Christian kids' books — from coloring books to A–Z Bible name stories — my mission is to make God's Word fun, memorable, and alive for children, while supporting parents in their role as spiritual nurturers.
              </p>
              <p>
                Beyond children's ministry, I also serve as a Goal Coach for women of faith. I help godly ambitious women gain clarity, build belief, embrace discipline, and align with their God-given purpose — because when mothers and women rise in Christ, they pass that light on to the next generation.
              </p>
              <p>
                At the heart of it all, I'm just a woman who loves Jesus, loves people, and believes every child deserves to know they are chosen, loved, and created with a divine purpose.
              </p>
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