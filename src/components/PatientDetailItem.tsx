
type PatientDetailItemProps = {
  label: string;
  data: string;
};

function PatientDetailItem({ label, data }: PatientDetailItemProps) {
  return (
    <p className="font-bold mb-3 text-slate-800 uppercase">
      {label}: <span className="font-normal normal-case">{data}</span>
    </p>
  );
}

export default PatientDetailItem;
