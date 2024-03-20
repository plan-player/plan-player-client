const TodoLog = () => {
  const records = ['00:00'];
  return (
    // <div className="flex j-between w-100 gap-md">
    <div className="w-100">
      <h5 className="mb-xs text-sm">Schedule</h5>
      <ol>
        {records.map((record) => (
          <li className="flex j-between i-center">
            <p className="text-sm">00:00 ~ 00:00</p>
            <strong className="text-smd">00:00:00</strong>
          </li>
        ))}
      </ol>
    </div>
    //   <div className="w-100">
    //     <h5 className="mb-xs text-sm">Schedule</h5>
    //     <ol>
    //       <li className="flex j-between i-center">
    //         <p className="text-sm">00:00 ~ 00:00</p>
    //         <strong className="text-smd">00:00:00</strong>
    //       </li>
    //     </ol>
    //   </div>
    // </div>
  );
};

export default TodoLog;
