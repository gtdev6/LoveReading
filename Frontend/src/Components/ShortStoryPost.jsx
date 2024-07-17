import "./CSS/ShortStoryPost.css";
import { formatDate } from "date-fns/format";

export function ShortStoryPost({ data }) {
        const date =
                data && data?.postedAt
                        ? formatDate(data.postedAt, "dd/MM/yyyy")
                        : "10/10/2020" || "10/10/2025";

        if (data)
                return (
                        <div className="shortStoryRootContainer">
                                <div className="shortStoryRootWrapper">
                                        <div className="shortStoryTitleWrapper">
                                                <p className="shortStoryTitleLabel">
                                                        Story Title
                                                </p>
                                                <h1 className="shortStoryTitleH">
                                                        {data.title}
                                                </h1>
                                        </div>
                                        <div className="shortStoryPostedAtWrapper">
                                                <p className="shortStoryPostedAtP">
                                                        Posted At{" "}
                                                        <span>{date}</span>
                                                </p>
                                        </div>
                                        <div className="shortStoryAuthorWrapper">
                                                <p className="shortStoryAuthorLabel">
                                                        Author
                                                </p>
                                                <p className="shortStoryAuthorP">
                                                        {data.author.name}
                                                </p>
                                        </div>
                                        <div className="shortStoryWrapper">
                                                <p className="shortStoryContentLabel">
                                                        Content
                                                </p>
                                                <p
                                                        style={{
                                                                whiteSpace: "pre-wrap",
                                                        }}
                                                        className="shortStoryP">
                                                        {data.content}
                                                </p>
                                        </div>
                                </div>
                        </div>
                );

        return (
                <div className="shortStoryRootContainer">
                        <div className="shortStoryRootWrapper">
                                <div className="shortStoryTitleWrapper">
                                        <p className="shortStoryTitleLabel">
                                                Story Title
                                        </p>
                                        <h1 className="shortStoryTitleH">
                                                Story Title
                                        </h1>
                                </div>
                                <div className="shortStoryPostedAtWrapper">
                                        <p className="shortStoryPostedAtP">
                                                Posted At{" "}
                                                <span>10/11/2024</span>
                                        </p>
                                </div>
                                <div className="shortStoryAuthorWrapper">
                                        <p className="shortStoryAuthorLabel">
                                                Author
                                        </p>
                                        <p className="shortStoryAuthorP">
                                                Name of Author
                                        </p>
                                </div>
                                <div className="shortStoryWrapper">
                                        <p className="shortStoryContentLabel">
                                                Content
                                        </p>
                                        <p className="shortStoryP">
                                                Mia sat in her small, cluttered
                                                apartment, gazing out at the
                                                bustling city below. The sun was
                                                setting, casting long shadows
                                                across the rooftops and painting
                                                the sky with hues of orange and
                                                pink. She sighed, running a hand
                                                through her tousled hair, and
                                                glanced at the stack of old
                                                letters on her coffee table.
                                                They had arrived earlier that
                                                day, wrapped in a faded ribbon,
                                                each envelope yellowed with age.
                                                She picked up the top letter,
                                                feeling the brittle paper
                                                between her fingers. It was
                                                addressed to her grandmother,
                                                Evelyn, from a man named James.
                                                Mia had never heard of James
                                                before, and her grandmother had
                                                passed away several years ago,
                                                taking many secrets with her.
                                                Curiosity got the better of her,
                                                and she carefully opened the
                                                first letter. Mia closed the
                                                journal, understanding now the
                                                difficult choices her
                                                grandmother had faced. She felt
                                                a deep connection to Evelyn, a
                                                woman who had loved deeply but
                                                had to make hard decisions in
                                                the face of uncertainty. As she
                                                prepared to leave the house, she
                                                noticed an old photograph tucked
                                                inside the journal. It was a
                                                picture of Evelyn and James,
                                                smiling and holding hands. On
                                                the back, in faded ink, were the
                                                words: "Our love will echo
                                                through the ages." Mia smiled
                                                through her tears, feeling a
                                                sense of closure. She knew now
                                                that love, in all its forms, had
                                                shaped her family. And though
                                                the past was filled with
                                                heartache, it was also a
                                                testament to the enduring power
                                                of love. As she walked away from
                                                the old house, the sun set on
                                                the horizon, casting a golden
                                                glow over the city. And in that
                                                moment, Mia felt at peace,
                                                knowing that the echoes of the
                                                past would forever resonate in
                                                her heart.
                                        </p>
                                </div>
                        </div>
                </div>
        );
}
