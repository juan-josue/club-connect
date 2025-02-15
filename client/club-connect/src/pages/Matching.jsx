import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";

const clubs = [
  {
    name: "(The) Students for AI Literacy at the University of Toronto (SAIL@UofT)",
    url: "https://sop.utoronto.ca/group/the-society-for-ai-literacy-at-the-university-of-toronto-sailuoft/",
    description:
      "We are excited to introduce Students for AI Literacy at UofT. This club aims to greatly enhance the student learning experience through the power of AI tools. SAIL@UofT is dedicated to promoting AI literacy among University of Toronto (UofT) students and is committed to enhancing academic achievement, organizational skills, and mental well-being through innovative AI solutions. Our Mission The mission of SAIL@UofT is to empower all students with the knowledge and resources to effectively integrate AI tools into their learning journey. By introducing students to tailored AI solutions, and fostering interdisciplinary collaboration and strategic partnerships, SAIL@UofT strives to bridge the gap between students and AI technology, enriching education and overall well-being. Core Objectives The Vice President of Marketing at SAIL@UofT will lead the charge in shaping and executing the club\u2019s marketing strategy, ensuring that our mission to promote AI literacy reaches a broad [\u2026] The Vice President of Outreach\u00a0at SAIL@UofT will be instrumental in expanding the club\u2019s network by building meaningful relationships with external organizations, industry partners, and AI professionals. Focused on identifying and [\u2026] The Post-Production Lead at SAIL@UofT will transform raw footage into compelling and polished visual content. This role involves overseeing all aspects of video editing, from cutting and assembling footage to [\u2026] We wish to acknowledge this land on which the University of Toronto operates. For thousands of years it has been the traditional land of the Huron-Wendat, the Seneca, and the Mississaugas of the Credit. Today, this meeting place is still the home to many Indigenous people from across Turtle Island and we are grateful to have the opportunity to work on this land. Read about U of T\u2019s Statement of Land Acknowledgement. University of Toronto - Since 1827",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    name: "11 Virtus Nova Investment Management",
    url: "https://sop.utoronto.ca/group/11-virtus-nova-investment-management/",
    description:
      "Virtus Nova Virtus Nova is an exclusive, student-run investment management club at the University of Toronto. Our mission is to bring together a select group of driven individuals with a strong passion for capital markets and a commitment to excellence in company research and analysis. At Virtus Nova, members collaborate to: We value ambition, intellectual curiosity, and a shared dedication to understanding the complexities of global financial markets. If you are ready to contribute your expertise and passion, Virtus Nova offers a platform to sharpen your skills and collaborate with like-minded peers. We wish to acknowledge this land on which the University of Toronto operates. For thousands of years it has been the traditional land of the Huron-Wendat, the Seneca, and the Mississaugas of the Credit. Today, this meeting place is still the home to many Indigenous people from across Turtle Island and we are grateful to have the opportunity to work on this land. Read about U of T\u2019s Statement of Land Acknowledgement. University of Toronto - Since 1827",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    name: "180 Degrees Consulting Club \u2013 University of Toronto",
    url: "https://sop.utoronto.ca/group/180-degrees-consulting-university-of-toronto/",
    description:
      "The goal of the 180 Degrees Consulting \u2013 University of Toronto branch is to encourage and foster student interest in the fields of consulting and non-profit/social enterprise. This will be accomplished by providing comprehensive training programs that will give students the opportunity to provide consulting services to solve real business problems affecting nonprofits, charities, and social enterprises. These initiatives help them develop necessary skills such as project management and professional networking, to gain visibility in this field. The Executive Members will serve as a support to these consultants year-round, while also serving the larger 180DC community by providing seminars, workshops, networking opportunities, and socials. These aforementioned initiatives will further spread the mission of the 180DC organization within the University community and encourage members to connect with each other. We wish to acknowledge this land on which the University of Toronto operates. For thousands of years it has been the traditional land of the Huron-Wendat, the Seneca, and the Mississaugas of the Credit. Today, this meeting place is still the home to many Indigenous people from across Turtle Island and we are grateful to have the opportunity to work on this land. Read about U of T\u2019s Statement of Land Acknowledgement. University of Toronto - Since 1827",
    tags: ["tag1", "tag2", "tag3"],
  },
];

function ClubCard({ name, link, description, tags, onLike, onDislike }) {
  return (
    <div className="flex flex-col w-[450px] h-[650px] gap-4 bg-base-200 p-8 rounded-2xl shadow-xl">
      <div className="flex h-[300px] bg-gradient-to-r from-blue-300 to-pink-200 justify-center items-center rounded p-8">
        <h2 className="text-base-100 text-3xl font-bold">{name}</h2>
      </div>

      <div className="flex gap-4 justify-start">
        {tags.map((tag, index) => {
          return (
            <div key={index} className="badge badge-secondary">
              {tag}
            </div>
          );
        })}
      </div>

      <p>
        {description.length > 250
          ? `${description.slice(0, 250)}...`
          : description}
      </p>

      <a className="link" href={link} target="_blank">
        Club Page
      </a>

      <div className="flex w-full justify-center gap-16">
        <button onClick={onDislike} className="btn btn-circle bg-base-100 p-8">
          <FontAwesomeIcon icon={faX} className="text-primary" />
        </button>
        <button onClick={onLike} className="btn btn-circle bg-primary p-8">
          <FontAwesomeIcon icon={faHeart} className="text-white" />
        </button>
      </div>
    </div>
  );
}

function Matching() {
  const [clubIndex, setClubIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  const { name, url, description, tags } = clubs[clubIndex];

  const onLike = () => {
    setMatches([...matches, clubs[clubIndex]]);
    setClubIndex(Math.min(clubIndex + 1, clubs.length - 1));
  };

  const onDislike = () => {
    setClubIndex(Math.min(clubIndex + 1, clubs.length - 1));
  };

  console.log(matches)

  return (
    <div className="flex justify-center items-center h-screen">
      <ClubCard
        name={name}
        link={url}
        description={description}
        tags={tags}
        onLike={onLike}
        onDislike={onDislike}
      />
    </div>
  );
}

export default Matching;
