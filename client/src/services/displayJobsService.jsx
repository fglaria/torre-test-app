
export const show = (jobsResult) => {
  console.log(jobsResult);
  return (
    <div class="mt-3 mb-5">
      {
        jobsResult.results.map((j, index) => 
          <div key={ index }>
            <p>{ j.id }</p>
          </div>
        )
      }
    </div>
  );
};
