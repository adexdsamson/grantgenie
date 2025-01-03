export const Clients = () => {
  return (
    <div className="mt-32">
      <div className="mb-16 text-center">
        <h2 className="md:text-4xl text-3xl font-extrabold">
          What our happy client say
        </h2>
      </div>
      <div className="grid md:grid-cols-3 md:py-16 gap-8 max-w-7xl max-md:max-w-lg mx-auto relative">
        <div className="bg-blue-100 lg:max-w-[70%] max-w-[80%] h-full w-full inset-0 mx-auto rounded-3xl absolute max-md:hidden"></div>

        <div className="h-auto lg:p-6 p-4 rounded-md mx-auto bg-white relative max-md:shadow-md">
          <div>
            <img
              src="https://www.danisoftsolution.com/images/2024/01/23/danny08.jpg"
              className="w-12 h-12 rounded-full"
            />
            <h4 className="whitespace-nowrap font-semibold mt-2">
              Daniel Ezimadu
            </h4>
            <p className="mt-1 text-xs">CEO of Danisoft</p>
          </div>
          <div className="mt-4">
            <p>
              Reaching out to the team for a proposal writing job during my
              application to the Tony Elumelu Foundation was one of the best
              decisions I made. They delivered on time with a quality proposal.
              They have helped secure over $150000 in both Grants and Project
              financing from institutions like Loadconnect, UNIOM, and UNDP.
            </p>
          </div>
        </div>

        <div className="h-auto lg:p-6 p-4 rounded-md mx-auto bg-white relative max-md:shadow-md">
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQFjPyTZ2IRQZQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693802698629?e=1741219200&v=beta&t=YRhqq1zZmHKDUudMEbo0VFXXg5aCM6f8fskNUgfMhn0"
              className="w-12 h-12 rounded-full"
            />
            <h4 className="whitespace-nowrap font-semibold mt-2">
              Dr. Adesina Fabenro Byron
            </h4>
            <p className="mt-1 text-xs">CRO of mothergold</p>
          </div>
          <div className="mt-4">
            <p>
              During our application for World Bank Project Finance for the SOML
              Programme, we were tasked with delivering some methodologies
              according to the Bank's Terms of Reference (ToR). We then reached
              out to the team, and they simplified the proposal writing process.
              Everything went smoothly, which resulted in us receiving an award
              of over $500k across 9 states in Nigeria.
            </p>
          </div>
        </div>

        <div className="h-auto lg:p-6 p-4 rounded-md mx-auto bg-white relative max-md:shadow-md">
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHzU77h0V_cbw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697556036659?e=1741219200&v=beta&t=u_1t5Iey0ZiuulfCWS0WScFb68Ye9Zsxc7LEFQDDXJk"
              className="w-12 h-12 rounded-full"
            />
            <h4 className="whitespace-nowrap font-semibold mt-2">
              Sope Afolanya
            </h4>
            <p className="mt-1 text-xs">Founder of Ceidhub</p>
          </div>
          <div className="mt-4">
            <p>
              Partnering with the team to deliver grant application documents
              has been a great choice. We now have time to focus on business
              development, and we never miss a single funding opportunity that
              comes to our table. It's been a wonderful experience doing this.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
