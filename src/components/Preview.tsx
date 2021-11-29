const Preview = () => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: '<b>これはBoldのプレビュー</b>' }}
      ></div>
    </>
  );
};
export default Preview;
